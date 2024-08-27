import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; 

export default function ArticleCardError() {
    return (
        <Card className='flex flex-col justify-center items-center'>
            <CardHeader
                avatar={<WarningAmberIcon color='error' />}
                title={<Typography variant='h6' component='h3' color='error'>
                    Something went wrong when loading these articles. Try again later.
                </Typography>}
            />
        </Card>
    )
}