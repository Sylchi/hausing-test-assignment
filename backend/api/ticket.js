const handler = prismaClient => async (req, res, next) => {
  const { id } = req.params;
  if(typeof id === 'number'){
     return res.json(await prismaClient.ticket.findUnique({ where: { id } }));
  } else {
    const { take, skip, orderBy } = req.params;
    return res.json(await prismaClient.ticket.findMany({
      take, 
      skip, 
      orderBy
    }));
  }
}

module.exports = { handler }