import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;