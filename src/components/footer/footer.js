
function Footer () {
  return (
    <div className="relative flex items-center justify-center w-full text-gray-700 bg-black h-fit">
      
      <div className="flex flex-col items-center p-8 text-xs w-fit h-fit bg-striped-dark">
        <p className="p-2 bg-opacity-25  whitespace-nowrap">DESIGNED AND CREATED BY KEVIN KIM</p>
        <a className="flex items-center justify-center w-full p-1 text-sm font-bold text-gray-700 transition-all gap-x-2 hover:text-green-300"
         target="_blank" href="https://github.com/sycodes95" rel="noreferrer">
          <i className="text-lg devicon-github-original"></i>
          GITHUB/SYCODES95
          
        </a> 
      </div>

      <div className="absolute right-0 flex flex-col items-center p-4 text-xs -translate-y-1/2 bg-red-700 w-fit h-fit top-1/2 bg-opacity-20 max-width-display-none">
        <p>Any bugs or suggestions? Contact: jobtrackrsupport@gmail.com</p>
      </div>


      
    </div>
  )
}

export default Footer