import conf from "./conf/conf.js";

function App() {
  console.log(conf.appwriteUrl);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
export default App;
