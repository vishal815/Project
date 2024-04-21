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

  const apiFetch = async () => {
    const { data } = await axios.get(
      'https://canopy-frontend-task.vercel.app/api/holdings'
    );

    setAssetClass(assetName);
    setAssets(
      data?.payload?.filter((asset) => asset.asset_class === assetName)
    );

  };

  useEffect(() => {
    apiFetch();
  }, []);

  return (
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
                      key={asset.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {asset.name}
                      </TableCell>
                      <TableCell align="middle">{asset.name}</TableCell>
                      <TableCell align="middle">{asset.ticker}</TableCell>
                      <TableCell align="middle">{asset.avg_price}</TableCell>
                      <TableCell align="middle">
                        {asset.latest_chg_pct}
                      </TableCell>
                      <TableCell align="middle">
                        {asset.market_value_ccy}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default DropdownTable;
