/* eslint-disable react/forbid-component-props */
/* eslint-disable no-ternary */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import MuiLink from '@material-ui/core/Link';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

// eslint-disable-next-line react/display-name
const NextComposed = React.forwardRef((props, ref) => {
    const { as, href, ...other } = props;

    return (
        <NextLink
            as={as}
            href={href}
        >
            <a
                ref={ref}
                {...other}
            />
        </NextLink>
    );
});

NextComposed.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool
};

/*
 * A styled version of the Next.js Link component:
 * https://nextjs.org/docs/#with-link
 */
const Link = (props) => {
    const {
        href,
        activeClassName = 'active',
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string'
        ? href
        : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    });

    if (naked) {
        return (
            <NextComposed
                className={className}
                href={href}
                ref={innerRef}
                {...other}
            />
        );
    }

    return (
        <MuiLink
            className={className}
            component={NextComposed}
            href={href}
            ref={innerRef}
            {...other}
        />
    );
};

Link.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool
};

// eslint-disable-next-line no-extra-parens
export default React.forwardRef((props, ref) => (
    <Link
        {...props}
        innerRef={ref}
    />
));
