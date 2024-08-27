import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; 

export default function ArticleCardError() {
    return (
        <Card className='flex flex-col justify-center items-center text-center'>
            <CardHeader
                className='flex flex-col md:flex-row'
                avatar={<WarningAmberIcon color='error' className='size-11 md:size-6' />}
                title={<Typography variant='h6' component='h3' color='error'>
                    Something went wrong when loading these articles. Try again later.
                </Typography>}
            />
        </Card>
    )
}