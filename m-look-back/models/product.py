import enum
import sqlalchemy as sa
from database.base import Base
from sqlalchemy.orm import relationship
from models.mixin import TimeStampMixin


class Product(Base, TimeStampMixin):
    __tablename__ = "products"

    class GenderEnum(enum.Enum):
        MALE = "male"
        FEMALE = "female"

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(250), nullable=True)
    description = sa.Column(sa.String(255), nullable=False)
    stock_in = sa.Column(sa.Integer, nullable=False)
    color = sa.Column(sa.String(255), nullable=False)
    selling_count = sa.Column(sa.Integer, nullable=False)
    discount = sa.Column(sa.Float, nullable=False)
    for_whom = sa.Column(sa.Enum(GenderEnum), nullable=False)

    category_id = sa.Column(sa.ForeignKey("categories.id"))
    price_id = sa.Column(sa.ForeignKey("product_prices.id"))

    category = relationship("ProductCategory", back_populates="products")
    review = relationship("ProductReview", back_populates="product")
    price = relationship("ProductPrice", back_populates="product")
    images = relationship("ProductImage", back_populates="product")

    def __repr__(self):
        return f"<Product {self.id}>"


class ProductCategory(Base, TimeStampMixin):
    __tablename__ = "categories"

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(200), nullable=False)

    products = relationship("Product", back_populates="category")

    def __repr__(self):
        return f"<ProductCategory {self.id}>"


class ProductPrice(Base, TimeStampMixin):
    __tablename__ = "product_prices"

    class CurrencyEnum(str, enum.Enum):
        UZS = "UZS"
        USD = "USD"
        EUR = "EUR"
        RUB = "RUB"

    id = sa.Column(sa.Integer, primary_key=True, index=True)
    current_amount = sa.Column(sa.Float, nullable=True)
    currency = sa.Column(sa.Enum(CurrencyEnum),
                         default=CurrencyEnum.UZS, nullable=False)
    old_amount = sa.Column(sa.Float, nullable=True)

    product = relationship("Product", back_populates="price")

    def __repr__(self):
        return f"<ProductPrice {self.id}>"


class ProductReview(Base, TimeStampMixin):
    __tablename__ = "product_reviews"

    id = sa.Column(sa.Integer, primary_key=True, index=True)
    rating = sa.Column(sa.Float, nullable=False)
    comment = sa.Column(sa.String(255), nullable=False)
    average_rating = sa.Column(sa.Float, nullable=False)

    product_id = sa.Column(sa.ForeignKey("products.id"))
    user_id = sa.Column(sa.ForeignKey("users.id"))

    product = relationship("Product", back_populates="review")
    user = relationship("User", back_populates="reviews")

    def __repr__(self):
        return f"<ProductReview {self.id}>"


class ProductImage(Base):
    __tablename__ = "product_images"

    id = sa.Column(sa.Integer, primary_key=True, index=True)
    img_url = sa.Column(sa.String, nullable=False)
    product_id = sa.Column(sa.Integer, sa.ForeignKey("products.id"))

    product = relationship("Product", back_populates="images")

    def __repr__(self):
        return f"<ProductImage {self.id}>"
