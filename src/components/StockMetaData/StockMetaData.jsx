import Typography from '@mui/material/Typography';
import { currencyFormatter } from '../../utils/formatters';

export default function StockMetaData ({ metaData }) {
    return (
        <>
            <Typography variant='h4' component='h1' className='font-bold tracking-wider'>
                {metaData.shortName}
            </Typography>
            <Typography variant='h4' component='h1' className='font-light tracking-wider' color='primary'>
                {currencyFormatter(metaData.regularMarketPrice)}
            </Typography>
        </>
    )
}