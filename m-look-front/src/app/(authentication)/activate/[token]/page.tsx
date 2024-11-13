import ActivationComp from "src/components/activation";

type ActivationPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ActivatePage({ params }: ActivationPageProps) {
  const { token } = await params;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br">
      <ActivationComp token={token} />
    </div>
  );
}
