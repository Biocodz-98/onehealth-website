'use client';
import { SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS, CALL_TO_ACTION } from '@/config';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icons } from './Icons';
import Search from './search/Search';
import { Result } from '@/hooks/useSearch';

interface NavigationItemProps {
  cls?: string;
  cls1?: string;
  logoCls?: string;
  navCls?: string;
  callCls?: string;
  hideCls?: string;
  searchQuery?: string;
  showServices?: boolean;
  showProduct?: boolean;
  setHovered?: React.Dispatch<SetStateAction<boolean>>;
  setHasSearch?: React.Dispatch<SetStateAction<boolean>>;
  setSearchQuery?: React.Dispatch<SetStateAction<string>>;
  setOpenPopup?: React.Dispatch<SetStateAction<boolean>>;
  setOpenCallUs?: React.Dispatch<SetStateAction<boolean>>;
  setOpenLogin?: React.Dispatch<SetStateAction<boolean>>;
  setSearchResult?: React.Dispatch<SetStateAction<Result[]>>;
  setShowServices?: React.Dispatch<SetStateAction<boolean>>;
  setShowProduct?: React.Dispatch<SetStateAction<boolean>>;
}

export default function NavItems(props: NavigationItemProps) {
  const [activeIndex, setActiveIndex] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    setActiveIndex(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        'flex h-full gap-4 text-secondary items-center ml-8',
        props.cls
      )}
    >
      <div className={cn('h-full items-center flex gap-4', props.cls1)}>
        {/* Product Dropdown */}
        <ul className={cn('flex relative', props.logoCls)}>
          <li
            onClick={() => props.setShowProduct?.((prev) => !prev)}
            className="flex gap-2 cursor-pointer items-center list-none"
          >
            <Icons.productMobile className="text-secondary" />
            <span className="text-sm">Products</span>
            <Icons.downArrow
              className={`${
                props.showProduct ? 'rotate-180' : ''
              } transition-all duration-300`}
            />
          </li>
        </ul>

        {/* Services Dropdown */}
        <ul className="flex relative">
          <li
            onClick={() => props.setShowServices?.((prev) => !prev)}
            className="flex gap-2 cursor-pointer items-center list-none"
          >
            <Icons.productMobile className="text-secondary" />
            <span className="text-sm">Services</span>
            <Icons.downArrow
              className={`${
                props.showServices ? 'rotate-180' : ''
              } transition-all duration-300`}
            />
          </li>
        </ul>

        <div className={props.hideCls}>
          <Search
            setQuery={props.setSearchQuery}
            query={props.searchQuery}
            setHasSearch={props.setHasSearch}
            className="md:-w-52"
            setSearchResult={props.setSearchResult!}
          />
        </div>
      </div>

      <ul className={cn('nav-links flex gap-1 ml-8', props.navCls)}>
        {NAV_LINKS.map((items, index) => (
          <li
            className={`bg-slate-150 hover:bg-slate-200 px-3 py-2 rounded-full text-sm list-none transition-all duration-300 ${
              activeIndex == items.href ? 'bg-slate-200' : ''
            }`}
            key={index}
            onClick={() => {
              setActiveIndex(items.href);
              if (items.label?.toLowerCase() === 'resources') {
                props.setHovered?.((prev) => !prev);
              }
            }}
            onMouseEnter={() => {
              if (items.label?.toLowerCase() === 'resources') {
                props.setHovered?.(true);
              }
            }}
          >
            <NavLink to={`${items.href}`} className={items.label}>
              {items.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className={cn('call-to-action flex ml-8 gap-2', props.callCls)}>
        {CALL_TO_ACTION.map((items, index) => (
          <li key={index} className="list-none">
            <NavLink
              className={`${items.variant} text-sm whitespace-nowrap flex items-center gap-2`}
              to={`${items.href}`}
              target={
                ['enter pharmarcy', 'sign in'].includes(
                  items.label.toLowerCase()
                )
                  ? '_blank'
                  : ''
              }
              onClick={() => {
                if (items.label.toLowerCase() === 'call us') {
                  props.setOpenCallUs?.(true);
                  props.setOpenLogin?.(false);
                  props.setHasSearch?.(false);
                  props.setSearchQuery?.('');
                }
              }}
            >
              {items.label == 'Call us' && <Icons.call />}
              {items.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
