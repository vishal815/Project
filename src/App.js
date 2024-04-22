import DropdownTable from './components/DropdownTable';

const App = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className='bg-gray-100 w-11/12 lg:w-10/12 p-10 rounded-xl'>
          <div className='flex flex-col gap-1'>
            <DropdownTable assetName="Real Estate" />
            <DropdownTable assetName="Cash" />
            <DropdownTable assetName="Bond" />
            <DropdownTable assetName="Equity" />
            <DropdownTable assetName="Fund" />
            <DropdownTable assetName="Loan" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;