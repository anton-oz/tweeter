import  Sidebar from '../components/Sidebar';


const Profile = () => {
  return (
    <div>
        <Sidebar />
        <main className="pl-[17.75rem] p-8 flex flex-col gap-8 h-screen justify-end w-screen" >
      <h1>Profile</h1>
      <p>Username: </p>
      </main>
    </div>
  );
};

export default Profile;