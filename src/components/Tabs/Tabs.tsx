import { FC } from 'react';
import classNames from 'classnames';
import { Tab } from '../../types/tab';

type PropsTabs = {
  tabs: Tab[],
  selectedTabId: string,
  onTabSelected: (tab: Tab) => void,
};

export const Tabs: FC<PropsTabs> = (props) => {
  const {
    tabs,
    selectedTabId,
    onTabSelected,
  } = props;

  const isValidCurrentTabId = () => {
    return tabs
      .map(tab => tab.id)
      .includes(selectedTabId);
  };

  const currentTabId = isValidCurrentTabId()
    ? selectedTabId
    : tabs[0].id;

  const changeTab = (tab: Tab) => {
    if (tab.id === currentTabId) {
      return;
    }

    onTabSelected(tab);
  };

  return (
    <div data-cy="TabsComponent">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => {
            const isSelected = currentTabId === tab.id;

            return (
              <li
                className={classNames({
                  'is-active': isSelected,
                })}
                data-cy="Tab"
                key={tab.id}
              >
                <a
                  href={`#${tab.id}`}
                  data-cy="TabLink"
                  onClick={() => changeTab(tab)}
                >
                  {tab.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {tabs.find(tab => tab.id === selectedTabId)?.content}
      </div>
    </div>
  );
};
