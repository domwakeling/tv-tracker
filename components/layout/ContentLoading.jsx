import CircularProgress from '@material-ui/core/CircularProgress';

// eslint-disable-next-line no-extra-parens
const ContentLoading = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}
    >
        <CircularProgress data-testid="content-loading" />
    </div>
);

export default ContentLoading;
