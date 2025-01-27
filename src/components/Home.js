import React from 'react';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 w-full">
        
        <div className="text-center max-w-xl px-4 flex flex-col items-center justify-center h-screen">


        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Effortlessly <mark class="px-4 py-1 mb-1 tracking-wide inline-block align-bottom text-white bg-blue-500 rounded-lg dark:bg-blue-500 animate-bounce"><div class="mb-2">split</div></mark> Expenses</h1>
<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Keep track, settle up, and stay organized with our simple expense-sharing app.</p>



          {/* <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Effortlessly Split Expenses with Friends
          </h1>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            Keep track, settle up, and stay organized with our simple expense-sharing app.
          </p> */}
          <div className="mt-6">
            <a href="/groups" className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-md shadow hover:bg-blue-600">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Us?</h2>
        <div className="mt-12 flex flex-wrap justify-center lg:justify-between gap-4">
          <FeatureCard title="Easy Tracking" description="Track your expenses in real-time with minimal effort." />
          <FeatureCard title="Simple Settling" description="Easily settle debts with friends in just a few clicks." />
          <FeatureCard title="Secure Payments" description="Your payments are safe with top-notch security measures." />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto py-12 px-4 text-center">
        {/* <div className="bg-white shadow-md rounded-lg mx-4 md:mx-16 p-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <div className="mt-8 space-y-8">
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">1. Create a Group</h3>
                <p className="text-gray-700">Start by creating a group with your friends or family.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">2. Add Expenses</h3>
                <p className="text-gray-700">Add expenses as you go, and we'll keep everything organized.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">3. Settle Up</h3>
                <p className="text-gray-700">Settle up when you're ready, with our secure payment options.</p>
              </div>
            </div>
          </div>
        </div> */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works.</h2>
        <div className="mt-12 flex flex-wrap justify-center lg:justify-between gap-8">
          <FeatureCard title="Create a Group" description="Start by creating a group with your friends or family." />
          <FeatureCard title="Add Expenses" description="Add expenses as you go, and we'll keep everything organized." />
          <FeatureCard title="Settle Up" description="Settle up when you're ready, with our secure payment options." />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-gradient-to-r from-blue-100 to-purple-100 shadow-md rounded-lg p-6 w-full sm:w-72">
    <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600 text-sm md:text-base">{description}</p>
  </div>
);

export default Home;
