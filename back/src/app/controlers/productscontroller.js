import Products from '../models/products';

class ProductsController {

    async updateOwnercreate(req, res) {
        // const { name } = req.params;
      
const {name,quantity,price}=await Products.create(req.body)

return res.json({name,quantity,price})

    }





  async updateOwner(req, res) {
   // const { name } = req.params;
    const {id,name, price, quantity } = req.body;
    console.log(req.body)
    try {
      const product = await Products.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (price) {
        product.price = price;
      }
      if (quantity) {
        product.quantity = quantity;
      }

      // Salve as alterações no banco de dados
      await product.save();
      console.log(product); // Verifica o produto atualizado

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to update product' });
    }
  }




  async updatecostumer(req, res) {
    // const { name } = req.params;
     const {id, name, price, quantity } = req.body;
     const lucro=price*quantity
     try {
       const product = await Products.findOne({ where: { id } });
 
       if (!product) {
         return res.status(404).json({ error: 'Product not found' });
       }
 
       if (quantity) {
        product.quantity = product.quantity-quantity;
        const aa= product.lucros
        console.log(lucro)
         product.lucros=Number(lucro)+Number(aa)
     }
 
       // Salve as alterações no banco de dados
       await product.save();
       console.log(product); // Verifica o produto atualizado
 
       return res.json(product);
     } catch (error) {
       console.log(error);
       return res.status(500).json({ error: 'Failed to update product' });
     }
   }











  async index(req, res) {
    const products = await Products.findAll();

    return res.json(products);
  }
}

export default new ProductsController();