import Login from '../../features/auth/components/Login';
import PageLayout from '../../layouts/PageLayout';
const SignIn = () => {
  return (
    <PageLayout
      headerProps={{
        title: '로그인',
      }}
      useNav={false}
    >
      <div className="flex flex-1 justify-center items-center">
        <Login className="w-full" />
      </div>
    </PageLayout>
  );
};

export default SignIn;
