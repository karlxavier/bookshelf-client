import Sidebar from "./sidebar";

export default function Layout({ children }: any) {

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col md:flex-row flex-1'>
        <Sidebar />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}