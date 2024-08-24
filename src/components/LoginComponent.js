export default function LoginComponent() {
    const googleLogin = () => {
        console.log("login clicked");
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }

    return (
  <div class="w-full max-w-lg flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          SplitX    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="flex flex-row items-center justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm" onClick={googleLogin}>
                <img class="w-6 mr-3" src="./google.png" alt=""/>                
                Login with Google
            </button>
              
          </div>
      </div>
  </div>
    )
}