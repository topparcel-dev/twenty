import styled from '@emotion/styled';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { IconComponent } from 'twenty-ui';

import { useTabList } from '@/ui/layout/tab/hooks/useTabList';
import { TabListScope } from '@/ui/layout/tab/scopes/TabListScope';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';

import { TabListFromUrlOptionalEffect } from '@/ui/layout/tab/components/TabListFromUrlOptionalEffect';
import { LayoutCard } from '@/ui/layout/tab/types/LayoutCard';
import { Tab } from './Tab';

export type SingleTabProps = {
  title: string;
  Icon?: IconComponent;
  id: string;
  hide?: boolean;
  disabled?: boolean;
  pill?: string | React.ReactElement;
  cards?: LayoutCard[];
};

type TabListProps = {
  tabListInstanceId: string;
  tabs: SingleTabProps[];
  loading?: boolean;
  className?: string;
  behaveAsLinks?: boolean;
};

const StyledContainer = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  box-sizing: border-box;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 40px;
  user-select: none;
`;

export const TabList = ({
  tabs,
  tabListInstanceId,
  loading,
  className,
  behaveAsLinks = true,
}: TabListProps) => {
  const initialActiveTabId = tabs.find((tab) => !tab.hide)?.id || '';

  const { activeTabIdState, setActiveTabId } = useTabList(tabListInstanceId);

  const activeTabId = useRecoilValue(activeTabIdState);

  React.useEffect(() => {
    setActiveTabId(initialActiveTabId);
  }, [initialActiveTabId, setActiveTabId]);

  return (
    <TabListScope tabListScopeId={tabListInstanceId}>
      <TabListFromUrlOptionalEffect
        componentInstanceId={tabListInstanceId}
        tabListIds={tabs.map((tab) => tab.id)}
      />
      <ScrollWrapper enableYScroll={false} contextProviderName="tabList">
        <StyledContainer className={className}>
          {tabs
            .filter((tab) => !tab.hide)
            .map((tab) => (
              <Tab
                id={tab.id}
                key={tab.id}
                title={tab.title}
                Icon={tab.Icon}
                active={tab.id === activeTabId}
                disabled={tab.disabled ?? loading}
                pill={tab.pill}
                to={behaveAsLinks ? `#${tab.id}` : undefined}
                onClick={() => {
                  if (!behaveAsLinks) {
                    setActiveTabId(tab.id);
                  }
                }}
              />
            ))}
        </StyledContainer>
      </ScrollWrapper>
    </TabListScope>
  );
};
