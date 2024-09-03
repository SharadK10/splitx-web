import React from 'react';
import Footer from './Footer';
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Header
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">SplitWiseApp</div>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#signup" className="text-gray-600 hover:text-gray-900">Sign Up</a>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 w-full">
<div class="text-center max-w-xl px-4 flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Effortlessly Split Expenses with Friends
          </h1>
          <p className="mt-4 text-gray-700">
            Keep track, settle up, and stay organized with our simple expense-sharing app.
          </p>
          <div className="mt-6">
            <a href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600">
              Get Started
            </a>
            {/* <a href="#features" className="ml-4 text-blue-500 hover:text-blue-600">
              Learn More
            </a> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
        <div class="mt-12 flex flex-wrap justify-between w-[72rem] mx-16">
          <FeatureCard title="Easy Tracking" description="Track your expenses in real-time with minimal effort." />
          <FeatureCard title="Simple Settling" description="Easily settle debts with friends in just a few clicks." />
          <FeatureCard title="Secure Payments" description="Your payments are safe with top-notch security measures." />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-100 py-12">
        
      <div class="bg-white shadow-md rounded-lg -mt-4 mx-16 p-8">
      <div className="container mx-auto px-4 text-center">        
                
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-8 space-y-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">1. Create a Group</h3>
              <p className="text-gray-700">Start by creating a group with your friends or family.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">2. Add Expenses</h3>
              <p className="text-gray-700">Add expenses as you go, and we'll keep everything organized.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">3. Settle Up</h3>
              <p className="text-gray-700">Settle up when you're ready, with our secure payment options.</p>
            </div>
          </div>
        </div>
        </div>
          
      </section>

      {/* Footer */}
      <Footer/>

    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 w-80">
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

export default Home;
