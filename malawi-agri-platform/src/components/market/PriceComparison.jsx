import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PriceComparison({ markets, selectedCrop }) {
  // Prepare data for the selected crop across all markets
  const comparisonData = markets.map(market => {
    const cropPrice = market.prices.find(p => p.crop === selectedCrop);
    return {
      market: market.city,
      price: cropPrice ? cropPrice.price : 0
    };
  });

  const formatPrice = (value) => {
    return `MK ${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {selectedCrop} Price Comparison
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="market" />
          <YAxis tickFormatter={formatPrice} />
          <Tooltip formatter={(value) => formatPrice(value)} />
          <Legend />
          <Bar dataKey="price" fill="#16a34a" name="Price (MWK)" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 p-4 bg-primary-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>💡 Tip:</strong> Compare prices across markets to find the best selling opportunity!
        </p>
      </div>
    </div>
  );
}

export default PriceComparison;