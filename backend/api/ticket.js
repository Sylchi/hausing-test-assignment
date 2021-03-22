const validators = { //TODO
  stringNotEmpty: val => {
    return true;
  },
  email: val => {
    return true;
  },
  digitBetween: (val, min, max) => {
    return true;
  }
}

const handler = prismaClient => async (req, res, next) => {
  switch(req.method){
    case 'GET':
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
    case 'POST':
      const { title, email, content, priority } = req.body;
      if(validators['stringNotEmpty'](title) && validators['email'](email) && validators['stringNotEmpty'](content) && validators['digitBetween'](priority, 1, 5)){
        try {
          const createdTicket = await prismaClient.ticket.create({
            data: { title, email, content, priority },
            select: {
              id: true,
              title: true,
              email: true,
              content: true,
              priority: true
            }
          });
          res.json(createdTicket)
        } catch(err){
          console.error(err);
        } 
      }
      console.log(title, email, content, priority ); 
  }

}

module.exports = { handler }