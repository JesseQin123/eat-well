import type { Recipe } from '@/types'
import { getImageGenerationConfig } from '@/utils/apiConfig'

export interface GeneratedImage {
    url: string
    id: string
}

export const generateRecipeImage = async (recipe: Recipe): Promise<GeneratedImage> => {
    // 从设置中获取图片生成配置
    const config = getImageGenerationConfig()

    // 构建图片生成的提示词
    const prompt = buildImagePrompt(recipe)

    try {
        // OpenRouter 的 Gemini 图片生成使用 chat completions 格式
        const response = await fetch(`${config.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Eat Well App'
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                modalities: ['image', 'text'],
                max_tokens: 500
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`API请求失败: ${response.status} - ${errorText}`)
        }

        const data = await response.json()

        // OpenRouter Gemini 格式: choices[0].message.images[0].image_url.url
        if (data.choices && data.choices.length > 0 && data.choices[0].message?.images?.length > 0) {
            const imageUrl = data.choices[0].message.images[0].image_url?.url
            if (imageUrl) {
                return {
                    url: imageUrl,
                    id: `${recipe.id}-${Date.now()}`
                }
            }
        }

        // 如果没有图片但有文字响应，记录日志
        if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
            console.log('AI响应文字:', data.choices[0].message.content)
        }

        throw new Error('API返回数据中未找到图片')
    } catch (error) {
        console.error('生成图片失败:', error)
        throw error
    }
}

const buildImagePrompt = (recipe: Recipe): string => {
    // 根据菜谱信息构建详细的图片生成提示词
    const ingredients = recipe.ingredients.join('、')
    const cuisineStyle = recipe.cuisine.replace('大师', '').replace('菜', '')

    return `一道精美的${cuisineStyle}菜肴：${recipe.name}，主要食材包括${ingredients}。菜品摆盘精致，色彩丰富，光线柔和，专业美食摄影风格，高清画质，餐厅级别的视觉效果。背景简洁，突出菜品本身的美感。`
}
