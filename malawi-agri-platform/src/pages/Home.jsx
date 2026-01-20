function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Chitukuko
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Agricultural Advisory Platform for Malawi
        </p>
        <div className="bg-primary-100 rounded-lg p-8 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">
            Get weather forecasts, crop calendars, market prices, and disease alerts - 
            all in one place to help you grow better crops! 🌾
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;