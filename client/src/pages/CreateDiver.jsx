import CreateGeneric from '../components/CreateGeneric';
export default function CreateDiver() {
  return (
    <CreateGeneric
      title="Criar Diver"
      endpoint="diver"
      redirectTo="/diver"
    />
  );
}