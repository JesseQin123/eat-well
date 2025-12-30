#!/usr/bin/env node

/**
 * API 测试脚本
 * 测试文字生成和图片生成 API 是否正常工作
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

const TEXT_API_URL = env.VITE_TEXT_GENERATION_BASE_URL
const TEXT_API_KEY = env.VITE_TEXT_GENERATION_API_KEY
const TEXT_MODEL = env.VITE_TEXT_GENERATION_MODEL

const IMAGE_API_URL = env.VITE_IMAGE_GENERATION_BASE_URL
const IMAGE_API_KEY = env.VITE_IMAGE_GENERATION_API_KEY
const IMAGE_MODEL = env.VITE_IMAGE_GENERATION_MODEL

console.log('🧪 开始测试 API 配置...\n')

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

// 测试文字生成 API
async function testTextGeneration() {
    console.log('📝 测试文字生成 API (GPT-4o Mini)...')
    console.log(`   模型: ${TEXT_MODEL}`)
    console.log(`   基础URL: ${TEXT_API_URL}`)

    try {
        const body = JSON.stringify({
            model: TEXT_MODEL,
            messages: [
                {
                    role: 'user',
                    content: '请用一句话介绍宫保鸡丁'
                }
            ],
            max_tokens: 100
        })

        const response = await httpsPost(`${TEXT_API_URL}/chat/completions`, {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TEXT_API_KEY}`
        }, body)

        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}: ${response.data}`)
        }

        const data = JSON.parse(response.data)
        const content = data.choices[0].message.content

        console.log('✅ 文字生成 API 测试成功!')
        console.log(`   响应: ${content.substring(0, 100)}...\n`)
        return true
    } catch (error) {
        console.log('❌ 文字生成 API 测试失败!')
        console.log(`   错误: ${error.message}\n`)
        return false
    }
}

// 测试图片生成 API (OpenRouter Gemini)
async function testImageGeneration() {
    console.log('🎨 测试图片生成 API (Gemini 2.5 Flash Image)...')
    console.log(`   模型: ${IMAGE_MODEL}`)
    console.log(`   基础URL: ${IMAGE_API_URL}`)

    try {
        // OpenRouter 的 Gemini 图片生成使用 chat completions 格式
        const body = JSON.stringify({
            model: IMAGE_MODEL,
            messages: [
                {
                    role: 'user',
                    content: '一道精美的中式菜肴：宫保鸡丁，色泽红亮，香辣可口，专业美食摄影风格'
                }
            ],
            modalities: ['image', 'text'],
            max_tokens: 100
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
        console.log('✅ 图片生成 API 测试成功!')
        console.log(`   响应:`, JSON.stringify(data, null, 2).substring(0, 300) + '...\n')
        return true
    } catch (error) {
        console.log('❌ 图片生成 API 测试失败!')
        console.log(`   错误: ${error.message}\n`)
        return false
    }
}

// 运行所有测试
async function runTests() {
    console.log('═══════════════════════════════════════════\n')

    const textResult = await testTextGeneration()
    const imageResult = await testImageGeneration()

    console.log('═══════════════════════════════════════════')
    console.log('\n📊 测试结果总结:')
    console.log(`   文字生成: ${textResult ? '✅ 通过' : '❌ 失败'}`)
    console.log(`   图片生成: ${imageResult ? '✅ 通过' : '❌ 失败'}`)

    if (textResult && imageResult) {
        console.log('\n🎉 所有 API 测试通过!你可以开始使用应用了!')
    } else {
        console.log('\n⚠️  部分 API 测试失败,请检查配置和 API Key')
    }
}

runTests().catch(console.error)
