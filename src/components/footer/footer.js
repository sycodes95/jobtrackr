
function Footer () {
  return (
    <div className=" h-fit w-full flex-grow flex justify-center items-center text-white pb-4 ">
      
      <div className="w-fit h-fit text-xs flex flex-col  items-center bg-striped-dark">
        <p className=" bg-opacity-25 p-2 whitespace-nowrap">DESIGNED AND CREATED BY KEVIN KIM</p>
        <a className="text-white text-sm font-bold bg-yellow-500 bg-opacity-25 p-1 w-full
         flex gap-x-2 items-center justify-center hover:text-green-300 transition-all"
         target="_blank" href="https://github.com/sycodes95" rel="noreferrer">
          <i class="devicon-github-original text-lg"></i>
          GITHUB/SYCODES95
          
        </a> 
      </div>
      
    </div>
  )
}

export default Footer