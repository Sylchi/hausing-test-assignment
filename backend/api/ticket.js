const validators = {
  stringNotEmpty: val => {
    return typeof val === 'string' && val.length > 0;
  },
  email: val => {
    if(typeof val !== 'string') return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(val);
  },
  digitBetween: (val, min, max) => {
    return typeof val === 'number' && val >= min && val <= max;
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
              priority: true,
              closedAt: true
            }
          });
          res.json(createdTicket)
        } catch(err){
          res.send(500);
          console.error(err);
        } 
      } else {
        res.send(400);
      }
      console.log(title, email, content, priority ); 
  }
}

module.exports = { handler }