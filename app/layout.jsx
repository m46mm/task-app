export const metadata = {
  title: 'タスク管理アプリ',
  description: 'Supabase with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
