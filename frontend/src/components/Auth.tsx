function Auth() {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-gray-700">
          Create an account
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Already have an account? <a href="/signin">Signin</a>
        </p>
      </div>
    </div>
  );
}

export default Auth;
