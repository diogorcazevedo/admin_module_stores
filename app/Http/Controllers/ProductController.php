<?php

namespace App\Http\Controllers;


use App\Http\Requests\StockCreateRequest;
use App\Http\Services\ProductImageService;
use App\Http\Services\ProductListService;
use App\Models\Category;
use App\Models\Collection;
use App\Models\ImageType;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{

    /**
     * @var ProductListService
     */
    private $productListService;

    /**
     * @var ProductImageService
     */
    private ProductImageService $productImageService;


    public function __construct(ProductListService $productListService,
                                ProductImageService $productImageService)

    {
        $this->productListService = $productListService;
        $this->productImageService = $productImageService;
    }


    public function index(Request $request,$collection = null,$category = null)
    {

        $search = $request->input('search');
        $products = $this->productListService->filter($search,$collection,$category);
        $categories = Category::orderBy('name','asc')->get();
        $collections = Collection::orderBy('name','asc')->get();


        return Inertia::render('Products/Index',[
            'products'=>$products,
            'search'=>$search,
            'categories'=>$categories,
            'collections'=>$collections,
        ]);

    }


    public function show(Collection $collection)
    {
        $data = $collection;
        return view('admin.product.show',compact('data'));
    }


    public function create(Collection $collection, Category $category)
    {
        $url = URL::previous();
        $categories  = $category->orderBy('name')->get();
        $collections = $collection->orderBy('slug')->get();

        return Inertia::render('Products/Create',[
            'categories'=>$categories,
            'collections'=>$collections,
            'url'=>$url,
        ]);
    }



    public function store(Request $request)
    {

        $data = $request->all();
        $data['slug'] = Str::slug($data['name'], "-");
        $data['line_up'] = Product::orderBy('line_up', 'desc')->first()->line_up + 3;
        $product = Product::create($data);
        return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
    }



    public function edit(Product $product,Collection $collection, Category $category)
    {
        $url = URL::previous();
        $categories  = $category->orderBy('name')->get();
        $collections = $collection->orderBy('slug')->get();

        return Inertia::render('Products/Edit',[
            'product'=>$product,
            'categories'=>$categories,
            'collections'=>$collections,
            'url'=>$url,
        ]);
    }


    public function update(Request $request, Product $product)
    {

        $data = $request->all();
        $data['slug'] = Str::slug($data['name'], "-");
        $product->update($data);
        return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('product.index',['collection'=>$product->collection_id,'category'=>null])->with('message', 'Operação realizada com sucesso');
    }


    public function images(Product $product)
    {

        $types = ImageType::where('sessao_id',4)->get();
        $images = $product->images();
        $images = $images->with('imageType')->get();

        return Inertia::render('Products/Images',[
            'images'=>$images,
            'product'=>$product,
            'types'=>$types,
        ]);

    }

    public function imageStore(Request $request,Product $product)
    {
        $this->productImageService->imageStore($request,$product);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function imageDestroy( $image)
    {
        $this->productImageService->imageDestroy($image);
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function price_change(Request $request,Product $product)
    {
        $data = $request->all();
        $product_stock = Stock::where('product_id',$data['product_id'])->first();
        $product_stock->offered_price = str_replace(",", ".", $data['offered_price']);
        $product_stock->save();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }

    public function price_store(StockCreateRequest $stockCreateRequest)
    {
        $stockCreateRequest->persist();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }
}


