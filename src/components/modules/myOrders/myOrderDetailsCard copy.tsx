const OrderedDetailsCard = ({ order, onBack }) => {
  const formattedDate = formatDate(order.createdAt);
  const statusColor = getStatusColor(order.status);
  const paymentStatusColor = getStatusColor(order.paymentStatus);
/ Utility to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Utility to get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
    case 'paid':
      return 'bg-green-500 text-white';
    case 'pending':
      return 'bg-yellow-500 text-black';
    case 'cancelled':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button onClick={onBack} variant="outline" className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to My Orders
      </Button>
      <Card className="w-full shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Order Details</CardTitle>
              <CardDescription className="mt-1">
                Order ID: {order._id}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <span className={`px-4 py-2 text-sm font-semibold rounded-full ${statusColor}`}>
                {order.status}
              </span>
              <span className={`px-4 py-2 text-sm font-semibold rounded-full ${paymentStatusColor}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Order Information</h3>
              <p><strong>Order Date:</strong> {formattedDate}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Payment Summary</h3>
              <div className="flex justify-between">
                <p>Total Amount:</p>
                <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charge:</p>
                <p className="font-medium">${order.deliveryCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <p>Final Amount:</p>
                <p>${order.finalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Ordered Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.orderedProducts.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                  <img
                    src={item.product?.image || `https://placehold.co/80x80/E2E8F0/1A202C?text=No+Img`}
                    alt={item.product?.name || 'Product Image'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-base">{item.product?.name || 'Product'}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-semibold">${item.unitPrice.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};