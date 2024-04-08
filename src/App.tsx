import avatarImage from './assets/avatar.webp'

function App() {
  

  return (
    <main className='min-h-screen flex justify-center items-center'>
      <div className="flex gap-8 bg-blue-950 bg-opacity-40 p-6 rounded-3xl text-pretty shadow-md">
        <div className='w-[200px] h-[200px] rounded-[25px] shadow-2xl overflow-hidden'>
          <img src={avatarImage} className="w-full h-full object-cover" alt="Song Image" />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-gray-400 text-[35px]">Grimes</p>
          <p className="text-gray-50 text-[35px]">So Heave I Fell Through the Earth </p>
          <div className="flex-1 flex items-center">
            <div className="bg-gradient-to-r from-green-600 to-purple-600 rounded-full h-[8px] w-full"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
