export default function Markdown({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-dvh ">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-24 ">{children}</div>
    </main>
  );
}

