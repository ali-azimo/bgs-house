import CreateGeneric from '../components/CreateGeneric';
export default function CreateSaude() {
  return (
    <CreateGeneric
      title="Criar Saúde"
      endpoint="saude"
      redirectTo="/saude"
    />
  );
}