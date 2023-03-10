
function TrackerTable () {
  const categories = [
    'APP DATE', 'FAV', 'COMPANY', 'COMPANY WEBSITE', 'APPLICATION METHOD', 'SOURCE WEBSITE', 'POSITION',
    'FIT RATING', 'LOCATION', 'RESPONSE DATE', 'INTERVIEW DATE',  'REJECTED', 'OFFER AMOUNT', 'ADDITIONAL'

  ]
  return (
    <div className='w-full overflow-x-auto'>
      <table >
        <thead>
          <tr >
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-red-800 border-opacity-30
            '>EDIT</th>
            {
            categories.map((cat, index) => (
            <th colspan='1' className='text-xs text-gray-300 p-2 border-r-2 border-dotted border-red-800 border-opacity-30
            '>{cat}</th>
            ))
            }

          </tr>
        </thead>
        <tbody>

        </tbody>
        

      </table>

      
      
    </div>
  )
}
export default TrackerTable;