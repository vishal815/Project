import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const DropdownTable = ({ assetName }) => {

  const columns = [
    'NAME OF THE HOLDING',
    'TICKER',
    'AVERAGE PRICE',
    'MARKET PRICE',
    'LATEST CHARGE PERCENTAGE',
    'MARKET VALUE IN BASE CCY',
  ];

  const [assetClass, setAssetClass] = useState('');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState();

  const apiFetch = async () => {

    try {

      setLoading(true);
      
      const { data } = await axios.get(
        'https://canopy-frontend-task.vercel.app/api/holdings'
      );

      setLoading(false);
  
      setAssetClass(assetName);
      setAssets(
        data?.payload?.filter((asset) => asset.asset_class === assetName)
      );

    } catch (error) {
      
      setLoading(false);

      console.log(error);

    }

  };

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <>

<div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span className='font-bold uppercase'>{assetClass} ({assets.length})</span>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((c) => (
                      <TableCell>{c}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow
                      key={asset.asset_class}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {asset.asset_class ? <TableCell align="middle"><span>{asset.asset_class}</span></TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                      {asset.ticker ? <TableCell align="middle"><span>{asset.ticker}</span></TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                      {asset.avg_price ? <TableCell align="middle"><span>{asset.avg_price}</span></TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                      {asset.market_price ? <TableCell align="middle"><span>{asset.market_price}</span></TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                      {asset.latest_chg_pct ? <TableCell align="middle">{asset.latest_chg_pct < 0 ? <span className='text-red-500'>{asset.latest_chg_pct}</span> : <span>{asset.latest_chg_pct}</span>}</TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                      {asset.market_value_ccy ? <TableCell align="middle">{asset.market_value_ccy < 0 ? <span className='text-red-500'>{asset.market_value_ccy}</span> : <span>{asset.market_value_ccy}</span>}</TableCell> : <TableCell align="middle"><span>NA</span></TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>

    {loading && <span className='my-3'> <i className="fa-solid fa-rotate-right animate-spin duration-100"></i> Loading {assetName} data from API</span>}

    </>
  );
};

export default DropdownTable;