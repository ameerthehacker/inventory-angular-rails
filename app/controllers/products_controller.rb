class ProductsController < ApplicationController


def index 
    respond_to do |format|
        format.html
        format.json  { render json: Product.all}
    end
end
def create
    @product=Product.new(get_params)
    respond_to do |format|
        format.json {
            if @product.save
                render json: {:success=>true},:status=>:ok
            else
                render json: {:success=>false},:status=>:error                
            end
        }
    end
end

def destroy
    @product=Product.find(params[:id])
    @product.destroy
    respond_to do |format|
        format.json{ render json: {success:true},status: :ok }
    end
end

def update
    @product=Product.find(params[:id])
    respond_to do |format|
        format.json{
            if @product.update(get_params) 
                render json: {success:@product},status: :ok
            else
                render json: {success:false},status: :error
            end
        }
    end
end

private 
    def get_params
        params.require(:product).permit(:name,:cost,:orgin,:note)
    end

end
