package com.mamaafrica.ai.market;

/**
 * What a promotion applies to. A promotion with no target is site-wide; otherwise
 * {@code targetValue} holds the product slug, day name, type code, collection or bundle slug.
 */
public enum PromotionTarget {
    PRODUCT,
    BORN_DAY,
    PRODUCT_TYPE,
    COLLECTION,
    BUNDLE
}
