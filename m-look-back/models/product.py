from database.base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float, func
from sqlalchemy.orm import relationship
import enum

class Product(Base):
      id = Column(Integer, primary_key=True, index=True)
      title = Column(String(255), nullable=False)
      description = Column(String(255), nullable=False)
      category_id = Column(Integer, ForeignKey("categories.id"))
      brand = Column(String(255), nullable=False)
      stock = Column(Integer, nullable=False)
      color = Column(String(255), nullable=False)
      selling_count = Column(Integer, nullable=False)
      discount = Column(Float, nullable=False)

      created_at = Column(DateTime, default=func.now())
      updated_at = Column(DateTime, default=None, onupdate=func.now())

      category = relationship("ProcuctCategory", back_populates="products", uselist=False)
      reviews = relationship("ProductReview", back_populates="product", uselist=True)
      price = relationship("ProductPrice", back_populates="product", uselist=False)
      images = relationship("ProductImage", back_populates="product", uselist=True)

      def __repr__(self):
            return f"<Product {self.title}>"
      
class Category(Base):
      id = Column(Integer, primary_key=True, index=True)
      name = Column(String(255), nullable=False)
      created_at = Column(DateTime, default=func.now())
      updated_at = Column(DateTime, default=None, onupdate=func.now())

      products = relationship("Product", back_populates="category", uselist=True)

      def __repr__(self):
            return f"<Category {self.name}>"
      
class ProductReview(Base):
      id = Column(Integer, primary_key=True, index=True)
      rating = Column(Float, nullable=False)
      comment = Column(String(255), nullable=False)
      avarage_rating = Column(Float, nullable=False)

      product_id = Column(Integer, ForeignKey("products.id"))
      user_id = Column(Integer, ForeignKey("users.id"))

      user = relationship("User", back_populates="reviews")
      product = relationship("Product", back_populates="reviews")

      def __repr__(self):
            return f"<ProductReview {self.rating}>"
      
class ProductPrice(Base):
      class CurrencyEnum(str, enum.Enum):
            UZS = "UZS"
            USD = "USD"
            EUR = "EUR"

      id = Column(Integer, primary_key=True, index=True)
      amount = Column(Float, nullable=False)
      currency = Column(enum.Enum(CurrencyEnum),default=CurrencyEnum.USD, nullable=False)

      product = relationship("Product", back_populates="price")

      def __repr__(self):
            return f"<ProductPrice {self.amount} {self.currency}>"
      

class ProductImage(Base):
      id = Column(Integer, primary_key=True, index=True)
      img_url = Column(String, nullable=False)
      product_id = Column(Integer, ForeignKey("products.id"))

      product = relationship("Product", back_populates="images")

      def __repr__(self):
            return f"<ProductImage {self.id}>"

