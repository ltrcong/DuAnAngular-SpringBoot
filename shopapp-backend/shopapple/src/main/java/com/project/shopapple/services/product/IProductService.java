package com.project.shopapple.services.product;

import com.project.shopapple.entities.Product;
import com.project.shopapple.entities.ProductImage;
import com.project.shopapple.models.ProductDTO;
import com.project.shopapple.models.ProductImageDTO;
import com.project.shopapple.responses.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;

    Product getProductId(Long id) throws Exception;

    Page<ProductResponse> getAllProduct(String keyword,
                                        Long categoryId, PageRequest pageRequest);

    Product updateProduct(Long id, ProductDTO productDTO) throws Exception;

    void deleteProduct(Long id);

    boolean existsByName(String name);

    ProductImage createProductImage(
            Long productID, ProductImageDTO productImageDTO ) throws Exception;

    List<Product> findProductsByIds(List<Long> productIds);
}
