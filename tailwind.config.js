/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 主黄色系 - 参考图片的背景色
                yellow: {
                    50: '#fefce8',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                // 粉色系 - 参考图片的头部色
                pink: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                },
                // 黑色系 - 参考图片的标签色
                dark: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                // 保留中性色
                neutral: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                },
                // 新增: Primary别名(引用CSS变量)
                primary: {
                    yellow: 'var(--color-yellow-400)',
                    pink: 'var(--color-pink-400)',
                    black: 'var(--color-black)',
                },
                // 新增: 语义色
                semantic: {
                    success: '#10B981',
                    error: '#EF4444',
                    warning: '#F59E0B',
                    info: '#3B82F6',
                }
            },
            // 新增: Brutal阴影
            boxShadow: {
                'brutal-sm': 'var(--shadow-brutal-sm)',
                'brutal-md': 'var(--shadow-brutal-md)',
                'brutal-lg': 'var(--shadow-brutal-lg)',
                'brutal-xl': 'var(--shadow-brutal-xl)',
            },
            // 新增: 圆角(引用CSS变量)
            borderRadius: {
                'xl': 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
            },
            // 新增: 动画时长
            transitionDuration: {
                'fast': 'var(--duration-fast)',
                'normal': 'var(--duration-normal)',
                'slow': 'var(--duration-slow)',
            }
        },
    },
    plugins: [],
}