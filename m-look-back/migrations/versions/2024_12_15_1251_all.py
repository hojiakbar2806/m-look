"""all

Revision ID: 13b0e76fa80c
Revises: 
Create Date: 2024-12-15 12:51:22.577186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '13b0e76fa80c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_prices',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('current_amount', sa.Float(), nullable=True),
    sa.Column('currency', sa.Enum('UZS', 'USD', 'EUR', 'RUB', name='currencyenum'), nullable=False),
    sa.Column('old_amount', sa.Float(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_prices_id'), 'product_prices', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=250), nullable=False),
    sa.Column('username', sa.String(length=250), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('hashed_password', sa.LargeBinary(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('last_login', sa.DateTime(), nullable=True),
    sa.Column('role', sa.Enum('USER', 'ADMIN', 'OWNER', 'MODERATOR', name='roleenum'), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=False)
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=250), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('stock_in', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=255), nullable=False),
    sa.Column('selling_count', sa.Integer(), nullable=False),
    sa.Column('discount', sa.Float(), nullable=False),
    sa.Column('for_whom', sa.Enum('MALE', 'FEMALE', name='genderenum'), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('price_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['price_id'], ['product_prices.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('gender', sa.Enum('MALE', 'FEMALE', name='genderenum'), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('profile_pic', sa.String(), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_profiles_id'), 'profiles', ['id'], unique=False)
    op.create_table('product_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_images_id'), 'product_images', ['id'], unique=False)
    op.create_table('product_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('average_rating', sa.Float(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_reviews_id'), 'product_reviews', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_product_reviews_id'), table_name='product_reviews')
    op.drop_table('product_reviews')
    op.drop_index(op.f('ix_product_images_id'), table_name='product_images')
    op.drop_table('product_images')
    op.drop_index(op.f('ix_profiles_id'), table_name='profiles')
    op.drop_table('profiles')
    op.drop_table('products')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_product_prices_id'), table_name='product_prices')
    op.drop_table('product_prices')
    op.drop_table('categories')
    # ### end Alembic commands ###
