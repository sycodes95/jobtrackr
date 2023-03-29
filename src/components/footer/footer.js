
function Footer () {
  return (
    <div className=" w-full  flex justify-center items-center text-white bg-striped p-12">
      <div className="w-fit h-fit text-xs flex flex-col gap-y-4 items-center bg-striped-dark">
        <p className="bg-yellow-300 bg-opacity-25 p-2">DESIGNED AND CREATED BY KEVIN KIM</p>
        <a className="text-white text-sm font-bold bg-black bg-opacity-25 p-1 w-full
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