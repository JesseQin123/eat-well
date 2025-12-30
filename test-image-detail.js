#!/usr/bin/env node

/**
 * 详细测试图片生成 API 响应格式
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

// 读取 .env 文件
function loadEnv() {
    const envPath = path.join(__dirname, '.env')
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const env = {}

    envContent.split('\n').forEach(line => {
        line = line.trim()
        if (!line || line.startsWith('#')) return
        const [key, ...valueParts] = line.split('=')
        env[key.trim()] = valueParts.join('=').trim()
    })

    return env
}

const env = loadEnv()

const IMAGE_API_URL = env.VITE_IMAGE_GENERATION_BASE_URL
const IMAGE_API_KEY = env.VITE_IMAGE_GENERATION_API_KEY
const IMAGE_MODEL = env.VITE_IMAGE_GENERATION_MODEL

// 通用 HTTPS POST 请求函数
function httpsPost(url, headers, body) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url)
        const options = {
            hostname: urlObj.hostname,
            port: 443,
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Length': Buffer.byteLength(body)
            }
        }

        const req = https.request(options, res => {
            let data = ''
            res.on('data', chunk => {
                data += chunk
            })
            res.on('end', () => {
                resolve({ status: res.statusCode, data })
            })
        })

        req.on('error', error => {
            reject(error)
        })

        req.write(body)
        req.end()
    })
}

async function testImageDetail() {
    console.log('🎨 测试图片生成 API 详细响应...\n')

    try {
        const body = JSON.stringify({
            model: IMAGE_MODEL,
            messages: [
                {
                    role: 'user',
                    content: '一道精美的中式菜肴：红烧肉，色泽红亮，肥而不腻，专业美食摄影风格'
                }
            ],
            modalities: ['image', 'text'],
            max_tokens: 500
        })

        const response = await httpsPost(`${IMAGE_API_URL}/chat/completions`, {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${IMAGE_API_KEY}`,
            'HTTP-Referer': 'https://eat-well.app',
            'X-Title': 'Eat Well App'
        }, body)

        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}: ${response.data}`)
        }

        const data = JSON.parse(response.data)

        console.log('✅ 完整响应数据:\n')
        console.log(JSON.stringify(data, null, 2))

        console.log('\n\n📋 响应结构分析:')
        console.log('- ID:', data.id)
        console.log('- Model:', data.model)
        console.log('- Provider:', data.provider)

        if (data.choices && data.choices.length > 0) {
            const choice = data.choices[0]
            console.log('- Finish Reason:', choice.finish_reason)

            if (choice.message) {
                console.log('- Message Role:', choice.message.role)
                console.log('- Message Content Type:', typeof choice.message.content)

                // 检查 content 是否包含图片信息
                if (typeof choice.message.content === 'string') {
                    console.log('- Content (string):', choice.message.content.substring(0, 200))
                } else if (Array.isArray(choice.message.content)) {
                    console.log('- Content (array):')
                    choice.message.content.forEach((item, index) => {
                        console.log(`  [${index}]`, item.type || 'unknown type')
                        if (item.type === 'image' || item.type === 'image_url') {
                            console.log(`      Image URL:`, item.url || item.image_url || 'not found')
                        } else if (item.type === 'text') {
                            console.log(`      Text:`, item.text)
                        }
                    })
                } else {
                    console.log('- Content:', choice.message.content)
                }
            }
        }

    } catch (error) {
        console.log('❌ 测试失败!')
        console.log(`   错误: ${error.message}`)
        if (error.stack) {
            console.log(`   堆栈: ${error.stack}`)
        }
    }
}

testImageDetail().catch(console.error)
