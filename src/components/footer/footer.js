
function Footer () {
  return (
    <div className="relative h-fit w-full flex-grow flex justify-center items-center text-white bg-black">
      
      <div className="w-fit h-fit text-xs flex flex-col p-8  items-center bg-striped-dark">
        <p className=" bg-opacity-25 p-2 whitespace-nowrap">DESIGNED AND CREATED BY KEVIN KIM</p>
        <a className="text-white text-sm font-bold  p-1 w-full
         flex gap-x-2 items-center justify-center hover:text-green-300 transition-all"
         target="_blank" href="https://github.com/sycodes95" rel="noreferrer">
          <i class="devicon-github-original text-lg"></i>
          GITHUB/SYCODES95
          
        </a> 
      </div>

      <div className="w-fit h-fit text-xs flex flex-col p-4 items-center
      absolute top-1/2 -translate-y-1/2 right-0 bg-red-700 bg-opacity-20 max-width-display-none">
        <p>Any bugs or suggestions? Contact: jobtrackrsupport@gmail.com</p>
      </div>


      
    </div>
  )
}

export default Footer