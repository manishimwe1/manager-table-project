import CardComponents from "@/components/CardComponents";
import CollapsibleItem from "@/components/CollapsibleItem";

export default async function Page() {
  return (
    <section className="flex flex-col w-full h-full space-y-4 ">
      <CardComponents />
      <CollapsibleItem />
    </section>
  );
}
// import React, { ReactNode } from 'react';
// import { MessageCircle, Package, ChartBar, Users, Check, ArrowRight } from 'lucide-react';

// const page = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <header className="bg-gradient-to-r from-blue-600 to-blue-700">
//         <nav className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="text-2xl font-bold text-white">SalesFlow</div>
//             <div className="hidden md:flex space-x-8 text-white">
//               <a href="#features" className="hover:text-blue-200">Features</a>
//               <a href="#pricing" className="hover:text-blue-200">Pricing</a>
//               <a href="#contact" className="hover:text-blue-200">Contact</a>
//             </div>
//             <div className="space-x-4">
//               <button className="px-4 py-2 text-blue-600 bg-white rounded-lg hover:bg-blue-50">
//                 Login
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="container mx-auto px-6 py-20">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2">
//               <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                 Manage Your Sales & Client Communication in One Place
//               </h1>
//               <p className="text-xl text-blue-100 mb-8">
//                 Streamline your sales process, track inventory, and communicate with clients efficiently.
//               </p>
//               <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 flex items-center">
//                 Get Started Free
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </button>
//             </div>
//             <div className="md:w-1/2 mt-10 md:mt-0">
//               <div className="bg-white p-6 rounded-lg shadow-xl">
//                 <img
//                   src="/api/placeholder/600/400"
//                   alt="Dashboard Preview"
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-20">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Succeed</h2>
//           <div className="grid md:grid-cols-3 gap-12">
//             <FeatureCard
//               icon={<MessageCircle className="h-8 w-8 text-blue-600" />}
//               title="Client Messaging"
//               description="Send personalized messages, follow-ups, and updates to your clients automatically."
//             />
//             <FeatureCard
//               icon={<Package className="h-8 w-8 text-blue-600" />}
//               title="Inventory Management"
//               description="Track stock levels, set alerts, and manage orders all in one place."
//             />
//             <FeatureCard
//               icon={<ChartBar className="h-8 w-8 text-blue-600" />}
//               title="Sales Analytics"
//               description="Get detailed insights into your sales performance and customer behavior."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <PricingCard
//               title="Starter"
//               price="29"
//               features={[
//                 "Up to 1,000 messages/month",
//                 "Basic inventory management",
//                 "Email support"
//               ]}
//             />
//             <PricingCard
//               title="Professional"
//               price="79"
//               featured={true}
//               features={[
//                 "Up to 10,000 messages/month",
//                 "Advanced inventory tracking",
//                 "Priority support",
//                 "Sales analytics"
//               ]}
//             />
//             <PricingCard
//               title="Enterprise"
//               price="199"
//               features={[
//                 "Unlimited messages",
//                 "Custom solutions",
//                 "Dedicated account manager",
//                 "API access"
//               ]}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Social Proof */}
//       <section className="py-20">
//         <div className="container mx-auto px-6">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-8">Trusted by Over 10,000 Businesses</h2>
//             <div className="flex justify-center space-x-12">
//               <div className="w-24 h-12 bg-gray-200 rounded" />
//               <div className="w-24 h-12 bg-gray-200 rounded" />
//               <div className="w-24 h-12 bg-gray-200 rounded" />
//               <div className="w-24 h-12 bg-gray-200 rounded" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-blue-600 py-20">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-white mb-8">
//             Ready to Transform Your Sales Process?
//           </h2>
//           <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50">
//             Start Your Free Trial
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">SalesFlow</h3>
//               <p className="text-gray-400">
//                 Empowering businesses with smart sales solutions.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Product</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Features</li>
//                 <li>Pricing</li>
//                 <li>Integration</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>About</li>
//                 <li>Blog</li>
//                 <li>Careers</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Legal</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Privacy</li>
//                 <li>Terms</li>
//                 <li>Security</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Feature Card Component
// const FeatureCard = ({ icon, title, description }: {
//   icon: ReactNode;
//   title: string;
//   description: string;
// }) => (
//   <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
//     <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
//       {icon}
//     </div>
//     <h3 className="text-xl font-bold mb-4">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// // Pricing Card Component
// const PricingCard = ({ title, price, features, featured = false }: {
//   title: string;
//   price: string;
//   features: string[];
//   featured?: boolean;
// }) => (
//   <div className={`rounded-lg p-8 ${featured ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-white'}`}>
//     <h3 className="text-xl font-bold mb-4">{title}</h3>
//     <div className="mb-6">
//       <span className="text-4xl font-bold">${price}</span>
//       <span className="text-sm">/month</span>
//     </div>
//     <ul className="space-y-4 mb-8">
//       {features.map((feature, index) => (
//         <li key={index} className="flex items-center">
//           <Check className="h-5 w-5 mr-2" />
//           {feature}
//         </li>
//       ))}
//     </ul>
//     <button
//       className={`w-full py-3 rounded-lg font-bold ${featured
//         ? 'bg-white text-blue-600 hover:bg-blue-50'
//         : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//     >
//       Get Started
//     </button>
//   </div>
// );

// export default page;