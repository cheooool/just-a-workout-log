import Register from '../../features/auth/components/Register';
import PageLayout from '../../layouts/PageLayout';
const SignUp = () => {
  return (
    <PageLayout
      headerProps={{
        title: '가입하기',
      }}
      useNav={false}
    >
      <div className="flex flex-1 justify-center items-center">
        <Register className="w-full" />
      </div>
    </PageLayout>
  );
};

export default SignUp;
