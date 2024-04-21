import DropdownTable from './components/DropdownTable';

const App = () => {
  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className="w-10/12 flex flex-col gap-3">
          <DropdownTable assetName="Real Estate" />
          <DropdownTable assetName="Cash" />
          <DropdownTable assetName="Bond" />
          <DropdownTable assetName="Equity" />
          <DropdownTable assetName="Fund" />
          <DropdownTable assetName="Loan" />
        </div>
      </div>
    </>
  );
};

export default App;
