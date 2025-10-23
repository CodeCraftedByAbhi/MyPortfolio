import { useSelector } from "react-redux";



const Home = () => {
    const user= useSelector((state)=>state.auth.user)
    console.log(user)

  return (
    <div className="max-w-4xl mx-auto mt-24 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Portfolio</h1>
      <p>This is the Home page after login.</p>
    </div>
  );
};

export default Home;
