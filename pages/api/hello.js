// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const RESPONSE_OK = 200;

export default (req, res) => {
    res.status(RESPONSE_OK).json({ name: 'John Doe' });
};
