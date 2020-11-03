import React, { Component } from "react";
import ListItemBeB from "./ListItemB&B";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./shared/theme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListWrapper = styled.div`
  width: ${props => props.theme.maxWidth};
  max-width: 90%;
  display: block;
  margin: auto;
  padding: 70px 0 20px;
  position: relative;
  z-index: 10;
  @media (min-width: ${props => props.theme.mediumDeviceWidth}) {
    padding: 90px 0 50px;
  }
`;
const ListTitle = styled.h2`
  font-weight: normal;
  font-size: 22px;
  margin-bottom: 5px;
  @media (min-width: ${props => props.theme.mediumDeviceWidth}) {
    font-size: 28px;
    margin-bottom: 10px;
  }
`;
const ListBreadcrumb = styled.div`
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 5px;
  color: ${props => props.theme.mediumGray};
  @media (min-width: ${props => props.theme.mediumDeviceWidth}) {
    margin-bottom: 20px;
  }
`;
const ListDragItem = styled.div`
  outline: none;
  position: relative;
  z-index: ${props => 99999 - props.order};
`;

class ListBeB extends Component {
  state = {
    listTitle: "ELENCO B&B",
    listBreadcrumb: "Nome / chek-in/check-out",
    items: [
      {
        id: 0,
        hasActions: true,
        textValue: "NomeB&B0",
        checkin: "oraX/",
        checkout:"oraY",
        image:
          "https://images.unsplash.com/photo-1542140372-de3e121eb11e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6feeb58669ba6adbd2aacc9c89391713&auto=format&fit=crop&w=200&q=80",
      
      },
      {
        id: 1,
        hasActions: true,
        textValue: "NomeB&B1",
        checkin: "oraX/",
        checkout:"oraY",
        image:
          "https://images.unsplash.com/photo-1542149624-8a12d5285934?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a91f847fdcc99b00a29d5a39a2b6f4b9&auto=format&fit=crop&w=200&q=80",
       
      },
      {
        id: 2,
        hasActions: true,
        textValue: "NomeB&B2",
        checkin: "oraX/",
        checkout:"oraY",
        image:
          "https://images.unsplash.com/photo-1542274368-443d694d79aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=13f276041134f4982218e49b446bedb1&auto=format&fit=crop&w=200&q=80"},
      
      {
        id: 3,
        hasActions: true,
        textValue: "NomeB&B3",
        checkin: "oraX/",
        checkout:"oraY",
        image:
          "https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c00cb83d290ac6e0b59ac95fcf46ee0e&auto=format&fit=crop&w=200&q=80",
      
        
      }
      
    ]
  };

  reorderItems = (startIndex, endIndex) => {
    const items = Array.from(this.state.items);
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
    this.setState({ items });
  };

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    this.reorderItems(source.index, destination.index);
  };

  refreshItemsList = id => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id)
      };
    });
  };

  render() {
    const { listTitle, listBreadcrumb, items } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <ListWrapper>
          <ListTitle>{listTitle}</ListTitle>
          <ListBreadcrumb>{listBreadcrumb}</ListBreadcrumb>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppabe-list">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {items.map((number, key) => (
                    <Draggable
                      draggableId={`draggable-${number.id}`}
                    
                    >
                      {(provided, snapshot) => (
                        <ListDragItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          order={key}
                        >
                          <ListItemBeB
                            number={number}
                            dragging={snapshot.isDragging}
                            onDeleteItem={this.refreshItemsList}
                          />
                        </ListDragItem>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ListWrapper>
      </ThemeProvider>
    );
  }
}

export default ListBeB;
